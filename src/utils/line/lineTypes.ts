interface PushData {
    type: "push";
    to: string;
    messages: { [key: string]: any };
    notificationDisabled?: boolean;
}

interface ReplyData {
    type: "reply";
    replyToken: string;
    messages: { [key: string]: any };
    notificationDisabled?: boolean;
}

interface MulticastData {
    type: "multicast";
    to: string[];
    messages: { [key: string]: any };
    notificationDisabled?: boolean;
}

export type LineData = PushData | ReplyData | MulticastData;

export interface ReceivedEvent {
    type: string;
    message: {
        type: string;
        id: string;
        text: string;
    };
    timestamp: number;
    source: {
        type: string;
        userId: string;
    };
    replyToken: string;
    mode: string;
    webhookEventId: string;
    deliveryContext: {
        isRedelivery: false;
    };
}
