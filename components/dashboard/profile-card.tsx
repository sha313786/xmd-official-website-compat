import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileCard() {
  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardContent className="p-6">

        <div className="flex items-center gap-4">

          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-red-600 text-2xl">
              FF
            </AvatarFallback>
          </Avatar>

          <div>

            <h2 className="text-2xl font-bold">
              Free Fire
            </h2>

            <p className="text-slate-400">
              Senior Consultant
            </p>

            <Badge className="mt-3 bg-green-600">
              Active Member
            </Badge>

          </div>

        </div>

      </CardContent>
    </Card>
  );
}