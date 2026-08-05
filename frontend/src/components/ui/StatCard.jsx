import { ArrowUpRight } from "lucide-react";
import Card from "./Card";

export default function StatCard({
    title,
    value,
    change,
    icon: Icon,
    color = "bg-blue-100",
}) {

    return (
        <Card className="hover:shadow-lg transition-all duration-300">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                        {value}
                    </h2>

                    <div className="flex items-center gap-1 mt-4 text-green-600">

                        <ArrowUpRight size={18} />

                        <span className="text-sm font-medium">
                            {change}
                        </span>

                    </div>

                </div>

                <div
                    className={`h-14 w-14 rounded-xl flex items-center justify-center ${color}`}
                >
                    <Icon
                        size={28}
                        className="text-slate-800"
                    />
                </div>

            </div>

        </Card>
    );
}