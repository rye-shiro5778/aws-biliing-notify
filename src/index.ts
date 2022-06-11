import { fetchBilling } from "./utils/aws/fetchBilling";
import { getLineTargets } from "./utils/line/getLineTargets";
import { LineData } from "./utils/line/lineTypes";
import { sendLineMessage } from "./utils/line/sendLineMessage";

export const handler = async () => {
    const targets = getLineTargets();

    if (!targets) {
        throw new Error("Lineの送信先がありません");
    }

    let message: string;
    try {
        const { dateRange, totalBlendedCost, totalUnblendedCost } = await fetchBilling();
        message = `${dateRange}のAWSコスト通知\nブレンドコスト：${totalBlendedCost}ドル\n非ブレンドコスト:${totalUnblendedCost}ドル`;
    } catch (err) {
        console.log(err);
        message = "今週のAWSコスト通知の取得に失敗しました、、";
    }

    const lineData: LineData = {
        type: "multicast",
        to: targets,
        messages: [
            {
                type: "text",
                text: message,
            },
        ],
        notificationDisabled: true,
    };

    sendLineMessage(lineData);
};

if (process.env.NODE_ENV === "test") {
    handler();
}
