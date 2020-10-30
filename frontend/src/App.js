
function App() {
  return (
    <div className="App">
      <table className="table border">
        <th>Layout</th>
        <tr>That decides which case and load the containers and components</tr>
        <th>
          <table className="table border">
            <th>Navbar</th>
            <tr>The Options can be selected without authentication</tr>
            <tr>The Options can only be selected with authentication</tr>
          </table>
          <table className="table border">
            <th>Main Content</th>
            <tr>The pages can be reached without authentication</tr>
            <tr>The pages can only be reached with authentication</tr>
          </table>
          <table className="table border">
            <th>Footer</th>
            <tr>The Options can be selected without authentication</tr>
            <tr>The Options can only be selected with authentication</tr>
          </table>
        </th>
      </table>
    </div>
  );
}

export default App;
