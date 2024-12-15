import "./Header.css"

function Header({ info = "Empty header" }) {
	return (
		<header className="header">
			{info}
		</header>
	)
}

export default Header;