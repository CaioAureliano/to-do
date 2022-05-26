export default function Title(props) {
    return (
        <div style={styles.div}>
            <h1 style={styles.title}>To-do's</h1>
        </div>
    );
}

const styles = {
    title: {
        fontSize: '6em',
        color: '#4e4e4e',
        margin: 0,
        padding: 0,
        fontFamily: 'serif'
    },
    div: {
        marginTop: '20px'
    }
}