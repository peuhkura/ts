const name = 'Half Stack application development';

interface CoursePartBase {
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

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

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
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
];

const renderCoursePart = (part: CoursePart) => {
  switch (part.kind) {
    case "basic":
      return (
        <div key={part.name}>
          <b>{part.name} Exercises: {part.exerciseCount}</b>
          <div><i>{part.description}</i></div>
          <br></br>
        </div>
      );
    case "group":
      return (
        <div key={part.name}>
          <b>{part.name} Exercises: {part.exerciseCount}</b>
          <div>Group project exercises: {part.groupProjectCount}</div>
          <br></br>
        </div>
      );
    case "background":
      return (
        <div key={part.name}>
          <b>{part.name} Exercises: {part.exerciseCount}</b>
          <div><i>{part.description}</i></div>
          <div>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></div>
          <br></br>
        </div>
      );
      case "special":
        return (
          <div key={part.name}>
            <b>{part.name}</b>
            <div><i>{part.description}</i></div>
            <div>Required skills: { part.requirements.join(', ')}</div>
            <br></br>
          </div>
        );
    default:
      return assertNever(part);
  }
};

function assertNever(value: never): never {
  throw new Error(`Unhandled item: ${JSON.stringify(value)}`);
}

const App = () => {
  //
  // Header
  // 
  type HeaderProps = {
    name: string;
  };
  
  const Header: React.FC<HeaderProps> = ({ name }) => (
    <h1>{name}</h1>
  );

  //
  // Content
  // 
  type ContentProps = {
    courseParts: CoursePart[];
  };
  const Content: React.FC<ContentProps> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map(part => renderCoursePart(part))}
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
  const totalExercises = courseParts.reduce((total, exercise) => total + exercise.exerciseCount, 0);

  //
  // Result
  //
  return (
    <div>
      <Header name={name} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />

    </div>
  )
};

export default App;
