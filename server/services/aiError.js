function getProviderError(error) {
    let providerError = error;
    while (providerError && typeof providerError === "object" && providerError.lastError) {
        providerError = providerError.lastError;
    }
    return providerError;
}

function getProviderMessage(providerError) {
    if (typeof providerError?.responseBody !== "string") {
        return null;
    }

    try {
        const body = JSON.parse(providerError.responseBody);
        const detail = body?.error?.message || body?.message;
        return typeof detail === "string" ? detail.slice(0, 300) : null;
    } catch {
        return null;
    }
}

export function getAIErrorDetails(error) {
    const providerError = getProviderError(error);
    const statusCode = Number.isInteger(providerError?.statusCode)
        ? providerError.statusCode
        : null;
    const providerMessage = getProviderMessage(providerError);
    const message = statusCode
        ? `AI provider request failed (HTTP ${statusCode})${providerMessage ? `: ${providerMessage}` : ""}`
        : error?.message || "AI provider request failed";
    const requestId =
        providerError?.responseHeaders?.["x-request-id"] ||
        providerError?.responseHeaders?.["x-openrouter-request-id"] ||
        null;

    return {
        message,
        statusCode,
        requestId,
        attempts: Array.isArray(error?.errors) ? error.errors.length : null,
    };
}
