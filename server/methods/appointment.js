var mailgun = Meteor.npmRequire("mailgun-js")({
  apiKey: Meteor.settings.mailgun_apikey,
  domain: Meteor.settings.mailgun_domain,
});

var asyncSend = function(data, callback) {
  mailgun.messages().send(data, callback);
};

Meteor.methods({
  createAppointment: function(toEmail, toName, text, ical) {

    var attachment = new mailgun.Attachment({
      data: new Buffer(ical),
      filename: "appointment.ics",
    });

    var body = "Hello! This is an email verifying your appointment with Curtis.";
    body += "\nBelow is the form information you filled out. Speak to you soon!";
    body += "\n\n" + text;

    var data = {
      from: "Curtis Larson <curtis@curtismlarson.com>",
      to: toEmail,
      bcc: "curtismlarson@gmail.com",
      subject: "Your appointment with Curtis",
      text: body,
      attachment: attachment,
    };

    var sendSync = Meteor.wrapAsync(asyncSend);
    return sendSync(data);
  },
});
