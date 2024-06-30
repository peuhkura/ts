const App = () => {
  /*const courseName = "Half Stack application development";
  
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);*/

  

  const course = 'Half Stack application development'
  interface HeaderProps {
    course: string;
  }
  const Header: React.FC<HeaderProps> = ({ course }) => (
    <h1>{course}</h1>
  );

  const exerciseData = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ] 
  interface ContentProps {
    parts: string;
  }
  const Content: React.FC<ContentProps> = ({ parts }) => (
    <div>{parts}</div>
  );
  const formattedPartsString = exerciseData.join(', ');

  interface TotalProps {
    parts: number;
  }
  const Total: React.FC<TotalProps> = ({ parts }) => (
    <div>{parts}</div>
  );
  const formattedPartsTotal = 12;

  return (
    <div>
      <Header course={course} />
      <Content parts={formattedPartsString} />
      <Total parts={formattedPartsTotal} />
    </div>
  )

  /*return (
    <div>
      <Header name={courseName} />
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );*/
};

export default App;
