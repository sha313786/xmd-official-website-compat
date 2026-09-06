import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const patientId = String(
      body.patientId ?? ""
    ).trim();

    const email = String(
      body.email ?? ""
    ).trim()
    .toLowerCase();

    const authUserId = String(
      body.authUserId ?? ""
    ).trim();

    if (!patientId || !email || !authUserId) {
      return NextResponse.json(
        {
          error:
            "Patient ID, email and authentication user ID are required.",
        },
        { status: 400 }
      );
    }

    /*
     * Verify that the Auth user actually belongs
     * to the email supplied during registration.
     */
    const {
      data: authUserData,
      error: authUserError,
    } = await supabaseAdmin.auth.admin.getUserById(
      authUserId
    );

    if (authUserError || !authUserData.user) {
      return NextResponse.json(
        {
          error:
            "Unable to verify patient account.",
        },
        { status: 400 }
      );
    }

    if (
      authUserData.user.email?.toLowerCase() !==
      email
    ) {
      return NextResponse.json(
        {
          error:
            "Email verification failed.",
        },
        { status: 400 }
      );
    }

    /*
     * Find the patient created by staff.
     */
    const {
      data: patient,
      error: patientError,
    } = await supabaseAdmin
      .from("patients")
      .select(
        "id, patient_id, auth_user_id, email"
      )
      .eq("patient_id", patientId)
      .maybeSingle();

    if (patientError) {
      return NextResponse.json(
        {
          error: patientError.message,
        },
        { status: 500 }
      );
    }

    if (!patient) {
      return NextResponse.json(
        {
          error:
            "Patient ID was not found. Please contact XMD staff.",
        },
        { status: 404 }
      );
    }

    /*
     * Prevent a patient record from being linked
     * to a second account.
     */
    if (patient.auth_user_id) {
      return NextResponse.json(
        {
          error:
            "This patient already has an account.",
        },
        { status: 409 }
      );
    }

    /*
     * Link the Auth account to the patient record.
     */
    const {
      error: updateError,
    } = await supabaseAdmin
      .from("patients")
      .update({
        auth_user_id: authUserId,
        email,
      })
      .eq("id", patient.id)
      .is("auth_user_id", null);

    if (updateError) {
      return NextResponse.json(
        {
          error: updateError.message,
        },
        { status: 500 }
      );
    }

    /*
     * Confirm that the link actually exists.
     */
    const {
      data: linkedPatient,
      error: verifyError,
    } = await supabaseAdmin
      .from("patients")
      .select(
        "id, patient_id, email, auth_user_id"
      )
      .eq("id", patient.id)
      .single();

    if (
      verifyError ||
      !linkedPatient ||
      linkedPatient.auth_user_id !== authUserId
    ) {
      return NextResponse.json(
        {
          error:
            "Patient account was created but could not be linked.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      patientId: linkedPatient.patient_id,
      email: linkedPatient.email,
      authUserId: linkedPatient.auth_user_id,
    });
  } catch (error) {
    console.error(
      "PATIENT REGISTRATION API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Registration failed.",
      },
      { status: 500 }
    );
  }
}