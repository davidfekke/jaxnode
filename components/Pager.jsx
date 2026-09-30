import Link from 'next/link';

export default function Pager({ currPage, pageCount }) {
  const page = parseInt(currPage, 10);
  const total = parseInt(pageCount, 10);

  const pages = [];
  for (let i = 0; i < total; i++) {
    if (i === page) {
      pages.push(
        <li className="page-item disabled" key={i}>
          <a className="page-link" href="#">{i + 1}</a>
        </li>
      );
    } else if (i === 0) {
      pages.push(
        <li className="page-item" key={i}>
          <Link className="page-link" href="/code">{i + 1}</Link>
        </li>
      );
    } else {
      pages.push(
        <li className="page-item" key={i}>
          <Link className="page-link" href={`/code/${i}`}>{i + 1}</Link>
        </li>
      );
    }
  }

  let previous;
  if (page === 0) {
    previous = (
      <li className="page-item disabled">
        <a className="page-link" href="#">Previous</a>
      </li>
    );
  } else if (page - 1 === 0) {
    previous = (
      <li className="page-item">
        <Link className="page-link" href="/code">Previous</Link>
      </li>
    );
  } else {
    previous = (
      <li className="page-item">
        <Link className="page-link" href={`/code/${page - 1}`}>Previous</Link>
      </li>
    );
  }

  let next;
  if (page === total - 1) {
    next = (
      <li className="page-item disabled">
        <a className="page-link" href="#">Next</a>
      </li>
    );
  } else {
    next = (
      <li className="page-item">
        <Link className="page-link" href={`/code/${page + 1}`}>Next</Link>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {previous}
        {pages}
        {next}
      </ul>
    </nav>
  );
}