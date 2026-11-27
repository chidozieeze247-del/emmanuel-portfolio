
/* =====================================
   PORTFOLIO VISITOR TRACKING
===================================== */

(async function portfolioVisitorTracking() {

    const visitorSupabase = window.testimonialSupabase;

    if (!visitorSupabase) {
        console.error("Visitor tracking: Supabase client not found.");
        return;
    }

    const visitorSessionId = crypto.randomUUID();

    const functionUrl =
        "https://wyzjtfnepzucdvqjztbh.supabase.co/functions/v1/quick-processor";

    const SUPABASE_PUBLISHABLE_KEY =
        "sb_publishable_TM8CyNjLhl5U3GOe_yie-A_M4NjaKjc";

    let visitCreated = false;
    let visitEnded = false;
    let entryTime = null;

    function getDeviceType() {
        const ua = navigator.userAgent;

        if (/tablet|ipad/i.test(ua)) return "Tablet";
        if (/mobile|android|iphone/i.test(ua)) return "Mobile";

        return "Desktop";
    }

    async function sendNotification(event, exitTime = null) {

        const payload = {
            event,
            session_id: visitorSessionId,
            entry_time: entryTime,
            exit_time: exitTime,
            device_type: getDeviceType(),
            page_url: window.location.href,
            duration: exitTime
                ? Math.round(
                    (new Date(exitTime) - new Date(entryTime)) / 1000
                  ) + " seconds"
                : "Still visiting"
        };

        try {
        const response = await fetch(functionUrl, {
            method: "POST",
            keepalive: event === "exit",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_PUBLISHABLE_KEY,
                "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
            },
            body: JSON.stringify(payload)
        });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            console.log(`${event} notification sent successfully.`);

        } catch (error) {
            console.error(`${event} notification failed:`, error);
        }
    }

    async function startVisit() {
        try {
            const { error } = await visitorSupabase
                .from("portfolio_visits")
                .insert({
                    session_id: visitorSessionId,
                    page_url: window.location.pathname,
                    device_type: getDeviceType()
                });

            if (error) throw error;

            visitCreated = true;
            entryTime = new Date().toISOString();

            console.log("Visitor entry recorded:", visitorSessionId);

            await sendNotification("entry");

        } catch (error) {
            console.error("Visitor entry failed:", error.message);
        }
    }

    async function updateVisit() {
        if (!visitCreated || visitEnded) return;

        const { error } = await visitorSupabase.rpc(
            "touch_portfolio_visit",
            { p_session_id: visitorSessionId }
        );

        if (error) {
            console.error("Heartbeat failed:", error.message);
        }
    }

    async function endVisit() {
        if (visitEnded || !visitCreated) return;

        visitEnded = true;
        clearInterval(heartbeat);

        const exitTime = new Date().toISOString();

        // Start the exit notification immediately.
        const notificationPromise = sendNotification("exit", exitTime);

        // Update the visitor record independently.
        try {
            const { error } = await visitorSupabase.rpc(
                "end_portfolio_visit",
                { p_session_id: visitorSessionId }
            );

            if (error) {
                console.error("Exit recording failed:", error.message);
            } else {
                console.log("Visitor exit recorded.");
            }
        } catch (error) {
            console.error("Exit recording failed:", error);
        }

        await notificationPromise;
    }

    await startVisit();

    const heartbeat = setInterval(updateVisit, 30000);

    window.addEventListener("pagehide", endVisit, { once: true });

})();
