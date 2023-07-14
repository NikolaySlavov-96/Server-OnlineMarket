const role = {
    'forProduct': ['manager', 'admin'],
    'forCommentars': ['moderator', 'manager', 'admin'],
    'createCommentar': ['customer'],
    'likeingProduct': ['customer'],
    'callWithCustomer': ['seller', 'marketing', 'manager', 'admin'],
    'editCallWithCustomer': ['manager', 'admin'],
    'forBlackList': ['manager, admin'],
    'createPartner': ['admin'],
}

module.exports = role;