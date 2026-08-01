import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Spacer } from "@/components/ui/spacer";
import type {
  CustomHtmlSectionData,
  DividerSectionData,
  FutureCustomBlockSectionData,
  SpacerSectionData,
} from "@/types";

/** Explicit vertical rhythm block between two CMS-authored sections. */
export function SpacerSection({ data }: { data: SpacerSectionData }) {
  return <Spacer size={data.size} />;
}

/** A content divider between two CMS-authored sections, with an optional
 * centered label. */
export function DividerSection({ data }: { data: DividerSectionData }) {
  return (
    <Container className="py-8">
      <Divider label={data.label} />
    </Container>
  );
}

export function CustomHtmlSection({ data }: { data: CustomHtmlSectionData }) {
  return (
    <Container className="py-8">
      {/* Deliberate trust boundary: `data.html` is authored exclusively by
          trusted WP admins via the "Custom HTML" ACF/Gutenberg block - the
          same trust model as WordPress's own Custom HTML block - so it is
          rendered as-is without further sanitization. */}
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
    </Container>
  );
}

export function FutureCustomBlockSection({ data }: { data: FutureCustomBlockSectionData }) {
  // Represents a CMS block type this build of the frontend doesn't implement
  // yet. Render nothing rather than crash or show a broken/empty box - the
  // block will start rendering once its component is added and wired up.
  void data;
  return null;
}
