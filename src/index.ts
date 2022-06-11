export const handler = () => {
    console.log("test");
};

if (process.env.NODE_ENV === "test") {
    handler();
}
