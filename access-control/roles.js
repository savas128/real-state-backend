const AccessControl = require("role-acl");
const ac = new AccessControl();

ac.grant("basic")
	.execute("create").on("apartments")
	.condition((context) => context.requester === context.owner).execute("read").on("apartments")
	.condition((context) => context.requester === context.owner).execute("update").on("apartments", ['*', '!status'])
	.execute()

ac.grant("admin")
	.extend("basic")
	.execute("read").on("apartments")
	.execute("update").on("apartments")

module.exports = ac;


