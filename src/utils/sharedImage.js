    const STORAGE_KEY = "sharedHomeImage";

    export function getSharedImage(defaultImage) {
    return localStorage.getItem(STORAGE_KEY) || defaultImage;
    }

    export function setSharedImage(imageDataUrl) {
    localStorage.setItem(STORAGE_KEY, imageDataUrl);
    // Trigger storage event for same-tab updates
    window.dispatchEvent(new Event("storage"));
    } 