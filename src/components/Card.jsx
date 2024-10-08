export default function Card({ content, onclick }) {
  return (
    <div className="card" onClick={() => onclick(content[0])}>
      <div className="img-background">
        <img className="card-img" src={content[1]} />
      </div>
      <h3 className="card-name">{content[0][0].toUpperCase() + content[0].slice(1)}</h3>
    </div>
  );
};
