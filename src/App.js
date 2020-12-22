import { useState, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import FooterMenu from './components/FooterMenu';
import Content from './components/Content';
import Sidebar from './components/Sidebar';

function App() {
	const [size, setSize] = useState({ windowWidth: 0, windowHeight: 0 });

	useEffect(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	}, []);

	const sidebarCollapsed = size.windowWidth < 1100;

	const styles = {
		white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		topBarHeight: 40,
		footerMenuHeight: 50,
		showFooterMenuText: size.windowWidth > 500,
		showSidebar: size.windowWidth > 768,
		sidebarCollapsed,
		sidebarWidth: sidebarCollapsed ? 50 : 150,
	};

	const updateDimensions = () => {
		let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
		let windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

		setSize({ windowWidth, windowHeight });
	};

	const menuItems = [
		{ icon: `😀`, text: 'Item 1' },
		{ icon: `😉`, text: 'Item 2' },
		{ icon: `😎`, text: 'Item 3' },
		{ icon: `🤔`, text: 'Item 4' },
		{ icon: `😛`, text: 'Item 5' },
	];

	if (styles.showSidebar) {
		menuItems.push({ icon: `😺️`, text: 'Profile' });
		menuItems.push({ icon: `⚙`, text: 'Settings' });
	}
	return (
		<div
			style={{
				backgroundColor: styles.black(0.05),
				minHeight: '100vh',
			}}>
			{styles.showSidebar ? (
				<Sidebar menuItems={menuItems} styles={styles} />
			) : (
				<TopBar styles={styles} />
			)}

			<Content styles={styles} />

			{!styles.showSidebar && (
				<FooterMenu menuItems={menuItems} styles={styles} />
			)}
		</div>
	);
}

export default App;
