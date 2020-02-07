const Mail = require("../../models/Mail");
const tools = require("../../utils/tools");
const { sendMail } = require("../../utils/mailsManager");

module.exports = {
  fetchMails: async function() {
    let mails = await Mail.find(null, null, { sort: { name: 1 } });
    return mails;
  },
  addMail: async function({ mailInput }, req) {
    // console.log("mail input", mailInput);
    console.log("attachments", mailInput.attachments);

    const mail = new Mail({
      from: mailInput.from,
      to: mailInput.to,
      projectName: mailInput.projectName,
      title: mailInput.title,
      description: mailInput.description,
      attachments: mailInput.attachments,
      createdBy: mailInput.createdBy,
      createdAt: mailInput.createdAt
    });
    try {
      sendMail({
        from: mailInput.from,
        to: mailInput.to,
        sender: mailInput.from,
        subject: mailInput.title,
        html: mailInput.description,
        attachments: mailInput.attachments
      });
      const storedMail = await mail.save();
      return { ...storedMail._doc, _id: storedMail._id.toString() };
    } catch (e) {
      return { errors: tools.formatErrors(e) };
    }
  }
};