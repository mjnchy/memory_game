export default function Card({ content }) {
  return (
    <div className="card">
      <img className="card-img" src={content[1]} />
      <h3 className="card-header">{content[0][0].toUpperCase() + content[0].slice(1)}</h3>
    </div>
  );
};
