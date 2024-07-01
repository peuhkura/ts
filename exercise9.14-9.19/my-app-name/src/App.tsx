const App = () => {
 /*interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];*/

  //
  // Header
  // 
  const name = 'Half Stack application development';
  type HeaderProps = {
    name: string;
  };
  
  const Header: React.FC<HeaderProps> = ({ name }) => (
    <h1>{name}</h1>
  );

  //
  // Content
  // 
  const parts = [
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
  type Exercise = {
    name: string;
    exercises: number;
  };
  type ContentProps = {
    parts: Exercise[];
  };
  const Content: React.FC<ContentProps> = ({ parts }) => {
    return (
      <div>
        {parts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exercises}
          </p>
        ))}
      </div>
    );
  };

  //
  // Total exercises
  // 
  interface TotalProps {
    total: number;
  }
  const Total: React.FC<TotalProps> = ({ total }) => {
    return (
      <p>
        Number of exercises {total}
      </p>
    );
  };
  const totalExercises = parts.reduce((total, exercise) => total + exercise.exercises, 0);

  //
  // Result
  //
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={totalExercises} />

    </div>
  )
};

export default App;
