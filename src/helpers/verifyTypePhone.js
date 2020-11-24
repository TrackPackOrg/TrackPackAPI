const verifyIsMobile = (phone) => {
    if (phone[3] == '9' || phone[3] == '3' || phone[3] == '8') {
        console.log('es celular')
        return true;
    }
    return false;
}

module.exports = { verifyIsMobile }