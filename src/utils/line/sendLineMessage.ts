import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { LineData } from "./lineTypes";

export const sendLineMsg = async (lineData: LineData): Promise<void> => {
    const { type: endpoint, ...data } = lineData;
    const LINE_TOKEN = process.env["LINE_TOKEN"];

    const URL = "https://api.line.me/v2/bot/message/" + endpoint;

    const webhookOptions: AxiosRequestConfig = {
        method: "POST",
        url: URL,
        headers: {
            Authorization: "Bearer " + LINE_TOKEN,
        },
        data,
    };

    try {
        const response: AxiosResponse = await axios.request(webhookOptions);
        if (response.status != 200) {
            throw new Error(`${response.status}エラー`);
        }
        return;
    } catch (e) {
        throw e;
    }
};
