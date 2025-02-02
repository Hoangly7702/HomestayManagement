import Header from 'src/components/Layout/components/Header';
function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: '75px' }}>
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default HeaderOnly;
