import NodeDetails from "../types/NodeDetails";

interface DetailsProps {
  data: NodeDetails
}

function Details({ data }: DetailsProps) {
  return (
    <div>
      <ul>
        {Object.entries(data).map((entry: string[]) => {
          const [key, value] = entry;
          return <li key={key}>{key}: {value}</li>
        })}
      </ul>
    </div>
  );
}

export default Details;