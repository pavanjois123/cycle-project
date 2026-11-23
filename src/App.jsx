import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

const initialEvents = [
  {
    id: 1,
    name: 'City Cruiser',
    category: 'City Cycle',
    price: 12000,
    description: 'A comfortable upright cycle for everyday rides and errands.',
    emoji: '🚲',
    color: 'peach',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Trail Explorer',
    category: 'Mountain Bike',
    price: 28000,
    description: 'Wide tyres and a sturdy frame for trails and rough roads.',
    emoji: '🚵',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Velocity Roadster',
    category: 'Road Bike',
    price: 45000,
    description: 'Lightweight design and drop bars for fast long-distance rides.',
    emoji: '🏁',
    color: 'rose',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Fold & Go',
    category: 'Folding Cycle',
    price: 22000,
    description: 'A compact folding frame that fits easily in homes and cars.',
    emoji: '🧳',
    color: 'lavender',
    image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=900&q=85',
  },
];

const categories = [
  { name: 'City Cycle', emoji: '🚲', color: 'peach' },
  { name: 'Mountain Bike', emoji: '⛰️', color: 'yellow' },
  { name: 'Road Bike', emoji: '🏁', color: 'rose' },
  { name: 'Folding Cycle', emoji: '🧳', color: 'lavender' },
];

const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">
        Cycle Hub
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/events">Cycles</NavLink>
        <NavLink to="/book">Book a test ride</NavLink>
        <NavLink to="/create">Add a cycle</NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="brand">Cycle Hub</Link>
      <p>Choose the ride that moves you.</p>
    </footer>
  );
}

function EventCard({ event, onBook }) {
  return (
    <article className="event-card">
      <div className={`event-art ${event.color || 'peach'}`}>
        {event.image ? (
          <img src={event.image} alt={`${event.name} ${event.category}`} />
        ) : (
          <span aria-hidden="true">{event.emoji || '🚲'}</span>
        )}
      </div>
      <div className="event-content">
        <p className="event-category">{event.category}</p>
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <div className="event-bottom">
          <div>
            <small>From</small>
            <strong>{money(Number(event.price))}</strong>
          </div>
          <button className="button button-small" onClick={() => onBook(event.category)}>
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

function Home({ events }) {
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CYCLE HUB</p>
          <h1>Find the right ride for you.</h1>
          <p>
            Browse city, road, mountain, and folding cycles.
            Compare options and book a test ride.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/events">View cycles</Link>
            <Link className="text-link" to="/create">Add a cycle</Link>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="Premium bicycles">
          <img
            src="https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&w=900&q=90"
            alt=""
          />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PICK A STYLE</p>
            <h2>What kind of cycle do you need?</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/events?category=${encodeURIComponent(category.name)}`}
              className={`category-card ${category.color}`}
              key={category.name}
            >
              <span className="category-emoji" aria-hidden="true">{category.emoji}</span>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FEW RIDES</p>
            <h2>Popular cycles</h2>
          </div>
          <Link to="/events" className="text-link">See all cycles</Link>
        </div>
        <div className="event-grid">
          {events.slice(0, 3).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBook={(category) => navigate(`/book?category=${encodeURIComponent(category)}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function Events({ events }) {
  const params = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(params.get('category') || 'All');
  const navigate = useNavigate();

  const filteredEvents = useMemo(() => events.filter((event) => {
    const matchesSearch = `${event.name} ${event.category} ${event.description}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === 'All'
      || event.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  }), [events, search, category]);

  return (
    <main className="page-shell">
      <div className="page-intro">
        <p className="eyebrow">CYCLE COLLECTION</p>
        <h1>Find your next ride.</h1>
        <p>Browse our cycles or search for a style that suits you.</p>
      </div>

      <div className="catalog-tools">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search cycles"
            aria-label="Search cycles"
          />
        </label>
        <div className="filter-pills" aria-label="Filter by cycle type">
          {['All', ...categories.map((item) => item.name)].map((item) => (
            <button
              key={item}
              className={category === item ? 'filter-pill active' : 'filter-pill'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="results-line">
        {filteredEvents.length} {filteredEvents.length === 1 ? 'cycle' : 'cycles'} found
      </p>

      {filteredEvents.length ? (
        <div className="event-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBook={(eventCategory) => navigate(`/book?category=${encodeURIComponent(eventCategory)}`)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No cycles found</h2>
          <p>Try a different search or clear the filters.</p>
          <button
            className="button"
            onClick={() => {
              setSearch('');
              setCategory('All');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}

function Booking({ events }) {
  const params = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({
    name: '',
    date: '',
    guests: '175',
    category: params.get('category') || '',
    receivingNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.date) nextErrors.date = 'Please choose a date.';
    else if (form.date < today) nextErrors.date = 'Please choose today or a future date.';
    if (!form.guests || Number(form.guests) < 100) {
      nextErrors.guests = 'Enter your height in centimetres.';
    }
    if (!form.category) nextErrors.category = 'Please choose a cycle type.';
    if (!form.receivingNumber.trim()) {
      nextErrors.receivingNumber = 'Please enter a receiving number.';
    }
    if (!form.address.trim()) {
      nextErrors.address = 'Please enter your address.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="page-shell narrow">
        <section className="success-panel">
          <p className="eyebrow">BOOKING REQUEST</p>
          <h1>Thanks, {form.name}!</h1>
          <p>
            Your test ride request for a {form.category} on {form.date},
            for a rider of {form.guests} cm, at {form.address}, and contact {form.receivingNumber},
            has been saved in this demo.
          </p>
          <p className="muted">This form does not send information to a server.</p>
          <Link className="button" to="/events">Back to cycles</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell narrow">
      <div className="page-intro">
        <p className="eyebrow">BOOK A TEST RIDE</p>
        <h1>Tell us about your ride.</h1>
        <p>Fill in the details below to make a test ride request.</p>
      </div>

      <form className="form-card" onSubmit={submit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Your name *</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={update}
            placeholder="Your name"
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="date">Test ride date *</label>
            <input
              id="date"
              type="date"
              name="date"
              min={today}
              value={form.date}
              onChange={update}
            />
            {errors.date && <small className="error">{errors.date}</small>}
          </div>
          <div className="form-field">
            <label htmlFor="guests">Rider height (cm) *</label>
            <input
              id="guests"
              type="number"
              min="100"
              name="guests"
              value={form.guests}
              onChange={update}
            />
            {errors.guests && <small className="error">{errors.guests}</small>}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="category">Cycle type *</label>
          <select id="category" name="category" value={form.category} onChange={update}>
            <option value="">Choose a cycle type</option>
            {[...new Set([...events.map((event) => event.category), ...categories.map((item) => item.name)])]
              .map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          {errors.category && <small className="error">{errors.category}</small>}
        </div>

        <div className="form-field">
          <label htmlFor="receivingNumber">Receiving number *</label>
          <input
            id="receivingNumber"
            type="tel"
            name="receivingNumber"
            value={form.receivingNumber}
            onChange={update}
            placeholder="Enter your contact number"
          />
          {errors.receivingNumber && <small className="error">{errors.receivingNumber}</small>}
        </div>

        <div className="form-field">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={form.address}
            onChange={update}
            placeholder="Enter your address"
          />
          {errors.address && <small className="error">{errors.address}</small>}
        </div>

        <button className="button" type="submit">Send request</button>
      </form>
    </main>
  );
}

function CreateEvent({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    emoji: '🚲',
    receivingNumber: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();

    if (
      !form.name.trim()
      || !form.category.trim()
      || !form.price
      || !form.description.trim()
      || !form.receivingNumber.trim()
      || !form.address.trim()
    ) {
      setError('Please fill in all the fields.');
      return;
    }
    if (Number(form.price) <= 0) {
      setError('Enter a price greater than zero.');
      return;
    }

    const colors = ['peach', 'yellow', 'rose', 'lavender'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    onAdd({
      ...form,
      id: Date.now(),
      price: Number(form.price),
      color,
      image: '',
    });
    setError('');
    setCreated(true);
  }

  if (created) {
    return (
      <main className="page-shell narrow">
        <section className="success-panel">
          <p className="eyebrow">CYCLE ADDED</p>
          <h1>{form.name} is ready.</h1>
          <p>Your cycle has been added to the collection for this session.</p>
          <div className="success-actions">
            <button className="button" onClick={() => navigate('/events')}>View cycles</button>
            <button
              className="button button-outline"
              onClick={() => {
                setForm({
                  name: '',
                  category: '',
                  price: '',
                  description: '',
                  emoji: '🎉',
                  receivingNumber: '',
                  address: '',
                });
                setCreated(false);
              }}
            >
              Add another
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell create-layout">
      <div className="page-intro">
        <p className="eyebrow">ADD A CYCLE</p>
        <h1>Add your own cycle.</h1>
        <p>Add a name, cycle type, price, and a short description.</p>
        <div className="custom-preview">
          <span className="preview-emoji" aria-hidden="true">{form.emoji}</span>
          <div>
            <small>PREVIEW</small>
            <h2>{form.name || 'Your cycle name'}</h2>
            <p>{form.category || 'Your cycle type'}</p>
            <strong>{form.price ? money(Number(form.price)) : 'Add a price'}</strong>
          </div>
        </div>
      </div>

      <form className="form-card" onSubmit={submit} noValidate>
        <div className="form-field">
          <label htmlFor="eventName">Cycle name *</label>
          <input
            id="eventName"
            name="name"
            value={form.name}
            onChange={update}
            placeholder="e.g. Urban commuter"
          />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="eventCategory">Cycle type *</label>
            <input
              id="eventCategory"
              name="category"
              value={form.category}
              onChange={update}
              placeholder="e.g. Hybrid bike"
            />
          </div>
          <div className="form-field">
            <label htmlFor="eventPrice">Price (₹) *</label>
            <input
              id="eventPrice"
              type="number"
              min="1"
              name="price"
              value={form.price}
              onChange={update}
              placeholder="9999"
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="emoji">Choose an icon</label>
          <select id="emoji" name="emoji" value={form.emoji} onChange={update}>
            <option>🚲</option>
            <option>🚵</option>
            <option>🏁</option>
            <option>🛴</option>
            <option>🧳</option>
            <option>⚡</option>
            <option>🌿</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="receivingNumber">Receiving number *</label>
          <input
            id="receivingNumber"
            type="tel"
            name="receivingNumber"
            value={form.receivingNumber}
            onChange={update}
            placeholder="Enter your contact number"
          />
        </div>
        <div className="form-field">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={form.address}
            onChange={update}
            placeholder="Enter the venue or delivery address"
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={update}
            placeholder="Describe the frame, gears, brakes, and features."
          />
        </div>
        {error && <small className="error form-error">{error}</small>}
        <button className="button" type="submit">Add cycle</button>
        <p className="form-hint">Cycles are only saved until you refresh the page.</p>
      </form>
    </main>
  );
}

export default function App() {
  const [events, setEvents] = useState(initialEvents);

  function addEvent(event) {
    setEvents((currentEvents) => [event, ...currentEvents]);
  }

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home events={events} />} />
        <Route path="/events" element={<Events events={events} />} />
        <Route path="/book" element={<Booking events={events} />} />
        <Route path="/create" element={<CreateEvent onAdd={addEvent} />} />
        <Route
          path="*"
          element={(
            <main className="page-shell empty-state">
              <h1>Page not found</h1>
              <Link className="button" to="/">Go home</Link>
            </main>
          )}
        />
      </Routes>
      <Footer />
    </div>
  );
}
