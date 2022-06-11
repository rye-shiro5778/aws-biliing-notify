import dayjs from "dayjs";
import { CostExplorerClient, GetCostAndUsageCommand, GetCostAndUsageCommandInput } from "@aws-sdk/client-cost-explorer";

export const fetchBilling = async () => {
    const startDate = dayjs().add(-7, "day");
    const endDate = dayjs();
    const client = new CostExplorerClient({ region: "us-east-1" });
    const params: GetCostAndUsageCommandInput = {
        Granularity: "DAILY",
        Metrics: ["BlendedCost", "UnblendedCost"],
        TimePeriod: {
            Start: startDate.format("YYYY-MM-DD"),
            End: endDate.format("YYYY-MM-DD"),
        },
        // GroupBy: [
        //     {
        //         Type: "DIMENSION",
        //         Key: "SERVICE",
        //     },
        // ],
    };
    const command = new GetCostAndUsageCommand(params);
    try {
        const cost = await client.send(command);
        let totalBlendedCost = 0;
        let totalUnblendedCost = 0;
        cost.ResultsByTime?.map(({ Total }) => {
            if (!Total) return;
            "BlendedCost" in Total && (totalBlendedCost += Number(Total.BlendedCost.Amount) || 0);
            "UnblendedCost" in Total && (totalUnblendedCost += Number(Total.UnblendedCost.Amount) || 0);
        });

        const response = {
            dateRange: `${startDate.format("M/D")}~${endDate.format("M/D")}`,
            totalBlendedCost,
            totalUnblendedCost,
        };
        return response;
    } catch (err) {
        throw err;
    }
};
