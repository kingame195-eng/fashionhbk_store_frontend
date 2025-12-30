import Card from "@components/common/Card";

function CardDemo() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Card Component Demo</h1>

      {/* Default Card */}
      <div style={{ marginBottom: "2rem" }}>
        <Card
          header={<h2>Default Card</h2>}
          body={<p>This is the body of a default card.</p>}
          footer={<button>Action</button>}
        />
      </div>

      {/* Outlined Card */}
      <div style={{ marginBottom: "2rem" }}>
        <Card
          variant="outlined"
          header={<h2>Outlined Card</h2>}
          body={<p>This is the body of an outlined card.</p>}
          footer={<button>Action</button>}
        />
      </div>

      {/* Shadowed Card */}
      <div style={{ marginBottom: "2rem" }}>
        <Card
          variant="shadowed"
          header={<h2>Shadowed Card</h2>}
          body={<p>This is the body of a shadowed card.</p>}
          footer={<button>Action</button>}
        />
      </div>
    </div>
  );
}

export default CardDemo;
