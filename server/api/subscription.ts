export default defineEventHandler(async (event) => {
  try {
    // Obtain body & and convertkit api key
    const body = await readBody(event);
    const { convertKitKey } = useRuntimeConfig();

    // Check for email
    if (!body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email address is required",
      });
    }

    // Make request to convertKit
    const res: any = await $fetch("https://api.convertkit.com/v3/forms/6688199/subscribe", {
      method: "POST",
      body: {
        api_key: convertKitKey,
        email: body.email,
      },
    });

    // Check if user is active
    if (res.subscription.state === "active") {
      return {
        message: "You're already subscribed!",
      };
    }
    // Return success message
    return {
      message: "Thank's for joining! Please check your email to confirm your subscription.",
    };
  } catch {
    // Handle network errors
    throw createError({ statusCode: 500, statusMessage: "Internal server error" });
  }
});
