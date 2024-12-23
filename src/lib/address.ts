export const maskAddress = (addr: string, len = 4) => {
    if (!addr) {
        return ""
    }

    return addr.slice(0, len) + "..." + addr.slice(-len)
}
