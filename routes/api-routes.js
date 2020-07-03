const { Workout } = require('../models');

module.exports = (app) => {
  //get last workout
  app.get('/api/workouts', async (req, res) => {
    const data = await Workout.find().sort({ _id: -1 }).limit(1);
    console.log('data', data);
    const lastWorkout = [
      {
        day: data[0].day,
        _id: data[0]._id,
        exercises: data[0].exercises,
        totalDuration: 0
      }
    ];
    data[0].exercises.forEach((exercise) => {
      if (exercise.duration) {
        lastWorkout[0].totalDuration += exercise.duration;
      }
    });
    res.send(lastWorkout);
  });

  app.post('/api/workouts', (req, res) => {
    const workout = new Workout({
      ...req.body,
      day: new Date().setDate(new Date().getDate())
    });

    Workout.create(workout)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send();
      });
  });

  app.put('/api/workouts/:id', (req, res) => {
    const id = req.params.id;
    const exercise = req.body;
    Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: exercise } })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(501);
      });
  });

  app.get('/api/workouts/range', (req, res) => {
    Workout.find({}).then((data) => {
      res.json(data);
    });
  });
};
