import TabPanels from "@/app/_components/ui/Tabs";
import CommentSection from "./ItemCommentSection";

export default async function RelatedContent() {
  return (
    <div className="bg-backdrop rounded-sm min-h-96">
      <TabPanels
        panels={[
          {
            panelName: "comments",
            panelContent: <CommentSection />,
          },
          {
            panelName: "drops",
            panelContent: <div>I am here for testing purposes</div>,
          },
        ]}
      />
    </div>
  );
}
