var Api = new Restivus({
  prettyJson: true,
});

Api.addRoute("ical", {}, {
  post: function() {
    var body = this.bodyParams;

    var ical = Meteor.call("createIcal",
                           body.summary,
                           body.location,
                           body.start,
                           body.end);

    return {ical: ical};
  },
});

Api.addRoute("appointment", {}, {
  post: function() {
    var body = this.bodyParams;

    var ical = Meteor.call("createIcal",
                           body.summary,
                           body.location,
                           body.start,
                           body.end);

    Meteor.call("createAppointment",
                body.to,
                body.name,
                body.text,
                ical);

    return {success: true};
  },
});
