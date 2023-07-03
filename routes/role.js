const role = {
    'forProduct': ['manager', 'admin'],
    'forCommentars': ['moderator', 'manager', 'admin'],
    'createCommentar': ['customer'],
    'callWithCustomer': ['seller', 'marketing', 'manager', 'admin'],
    'editCallWithCustomer': ['manager', 'admin'],
}

module.exports = {
    role,
}