import CollectionList from "./_components/CollectionList";

export default function Layout({ children, modal }) {
    return (
        <>
            <CollectionList />
            {children}
            {modal}
        </>
    );
}
