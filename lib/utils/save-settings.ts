import { toast } from "sonner";

type SaveOptions = {
    action: () => Promise<void>;
    setLoading: (loading: boolean) => void;
    successMessage?: string;
    errorMessage?: string;
};

export async function saveSettings({
    action,
    setLoading,
    successMessage = "Settings saved successfully.",
    errorMessage = "Unable to save settings.",
}: SaveOptions) {
    try {
        setLoading(true);

        await action();

        toast.success(successMessage);
    } catch (error) {
        console.error(error);

        toast.error(errorMessage);

        throw error;
    } finally {
        setLoading(false);
    }
}