Meteor.methods({
  createIcal: function(summary, location, start, end) {
    var cal = ical({});

    cal.events([
      {
        summary: summary,
        organizer: {
          name: "Curtis Larson",
          email: "curtis@curtismlarson.com",
        },
        location: location,
        start: new Date(start),
        end: new Date(end),
      },
    ]);

    return cal.toString();
  },
});
