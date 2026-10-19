import CollectionList from "./_components/CollectionList";
import PageContainer from "../../../components/layout/PageContainer";

export default function Layout({ children, modal }) {
    return (
        <PageContainer>
            <CollectionList />
            {children}
            {modal}
        </PageContainer>
    );
}
