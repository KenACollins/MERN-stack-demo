// Format large numbers with thousands separator. Example: 12345 => 12,345
export const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
