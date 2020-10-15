export function trimRegionName(region) {
    const trimmed = region.split(' ').join('')
    return trimmed.charAt(0).toLowerCase() + trimmed.slice(1)
}

export function splitRegionName(region) {
    const trimmed = region.charAt(0).toUpperCase() + region.slice(1)
    return trimmed.match(/[A-Z][a-z]+/g).join(' ')
}

export function clearArrows() {
    document.querySelectorAll('i').forEach(icon => {
        icon.classList.remove('fa-arrow-down')
        icon.classList.remove('fa-arrow-up')
    })
}