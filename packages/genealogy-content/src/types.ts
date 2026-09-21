export type PublicationStatus = 'published';
export type PrivacyStatus = 'public';

export interface PublicationReview {
  readonly status: PublicationStatus;
  readonly privacy: PrivacyStatus;
  readonly reviewedOn: string;
}

export type PersonId =
  | 'benjamin'
  | 'george'
  | 'franklin'
  | 'james-1892'
  | 'james-1934'
  | 'cynthia'
  | 'shannon';

export type RelationshipId =
  | 'benjamin-george'
  | 'george-franklin'
  | 'franklin-james-1892'
  | 'james-1892-james-1934'
  | 'james-1934-cynthia'
  | 'cynthia-shannon';

export type CaseId = 'parentage' | 'george-connection' | 'burial-ground';
export type StoryId = 'migration' | 'between-lines' | 'texas-reconnection';
export type EvidenceClusterId =
  | 'kentucky-records'
  | 'missouri-network'
  | 'texas-records';
export type MediaId =
  | 'kentucky-map-1818'
  | 'highland-creek-map-1818'
  | 'ralls-map-1878'
  | 'benjamin-bond'
  | 'george-marker'
  | 'franklin-home'
  | 'james-1892-porch'
  | 'jimmy-studio'
  | 'cynthia-school'
  | 'andy-headshot';

export interface Person {
  readonly id: PersonId;
  readonly name: string;
  readonly period: string;
  readonly relation: string;
  readonly place: string;
  readonly summary: string;
  readonly evidenceType: 'personal' | 'direct' | 'indirect' | 'family';
  readonly assessment: 'documented' | 'high-confidence' | 'known';
  readonly referenceIds: readonly number[];
  readonly publication: PublicationReview;
}

export interface Relationship {
  readonly id: RelationshipId;
  readonly from: PersonId;
  readonly to: PersonId;
  readonly kind: 'parent-child';
  readonly evidenceType: 'direct' | 'indirect' | 'family';
  readonly assessment: 'documented' | 'high-confidence' | 'known';
  readonly statement: string;
  readonly support: readonly string[];
  readonly limitation: string;
  readonly referenceIds: readonly number[];
  readonly publication: PublicationReview;
}

export interface Reference {
  readonly id: number;
  readonly title: string;
  readonly citation: string;
  readonly supports: string;
  readonly limitation: string;
  readonly url?: string;
  readonly accessLabel?: string;
  readonly accessLinks?: readonly ReferenceAccessLink[];
  readonly visualAccess?: ReferenceVisualAccess;
  readonly publication: PublicationReview;
}

export interface ReferenceAccessLink {
  readonly label: string;
  readonly url: string;
}

export type ReferenceVisualAccessStatus =
  | 'reviewed-preview'
  | 'external-original-only'
  | 'external-volume-only'
  | 'text-only-deferred';

export type ReferenceVisualAccess =
  | {
      readonly status: 'reviewed-preview';
      readonly previewMediaIds: readonly MediaId[];
      readonly note: string;
    }
  | {
      readonly status: Exclude<ReferenceVisualAccessStatus, 'reviewed-preview'>;
      readonly previewMediaIds?: never;
      readonly note: string;
    };

export interface EvidenceCard {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly detail: string;
  readonly referenceIds: readonly number[];
  readonly tone: 'record' | 'inference' | 'limit';
}

export interface CaseSection {
  readonly id: string;
  readonly label: string;
  readonly heading: string;
  readonly intro: string;
  readonly cards: readonly EvidenceCard[];
}

export interface ResearchCase {
  readonly id: CaseId;
  readonly number: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly assessment: string;
  readonly assessmentType: 'unresolved' | 'accepted' | 'conflicting';
  readonly summary: string;
  readonly known: string;
  readonly unknown: string;
  readonly relatedPersonIds: readonly PersonId[];
  readonly referenceIds: readonly number[];
  readonly sections: readonly CaseSection[];
  readonly relatedStoryIds: readonly StoryId[];
  readonly publication: PublicationReview;
}

export interface StoryEvent {
  readonly id: string;
  readonly year: string;
  readonly place: string;
  readonly record: string;
  readonly interpretation: string;
  readonly referenceIds: readonly number[];
  readonly routeIndex: number;
}

export interface Story {
  readonly id: StoryId;
  readonly number: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly period: string;
  readonly summary: string;
  readonly routePlaces: readonly string[];
  readonly events: readonly StoryEvent[];
  readonly relatedCaseIds: readonly CaseId[];
  readonly publication: PublicationReview;
}

export interface EvidenceClusterNode {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly kind: 'person' | 'household' | 'land' | 'record' | 'work';
  readonly referenceIds: readonly number[];
}

export interface EvidenceClusterLink {
  readonly from: string;
  readonly to: string;
  readonly label: string;
  readonly kind: 'documented' | 'context' | 'indirect';
}

export interface EvidenceCluster {
  readonly id: EvidenceClusterId;
  readonly title: string;
  readonly place: string;
  readonly period: string;
  readonly summary: string;
  readonly boundary: string;
  readonly nodes: readonly EvidenceClusterNode[];
  readonly links: readonly EvidenceClusterLink[];
  readonly publication: PublicationReview;
}

export type ReconstructionId = 'highland-creek';
export type ReconstructionEvidenceState =
  | 'recorded'
  | 'identity-synthesis'
  | 'hypothesis';

export type ReconstructionConnectionKind =
  | 'spouse'
  | 'parent-child'
  | 'sibling'
  | 'heirship-unknown-degree'
  | 'identity'
  | 'open-parentage-hypothesis'
  | 'deed-property-transfer'
  | 'land-title-association'
  | 'legal-record-role';

export interface ReconstructionNode {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly kind: 'person' | 'land' | 'record';
  readonly recordGroup: 'will-1779' | 'logan-1795' | 'highland-creek';
  readonly referenceIds: readonly number[];
}

export interface ReconstructionEdge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly relationship: string;
  readonly connectionKind: ReconstructionConnectionKind;
  readonly evidenceState: ReconstructionEvidenceState;
  readonly statement: string;
  readonly limitation: string;
  readonly referenceIds: readonly number[];
}

export interface ReconstructionTimelineEvent {
  readonly id: string;
  readonly date: string;
  readonly title: string;
  readonly detail: string;
  readonly referenceIds: readonly number[];
}

export type DocumentRightsState = 'permission-required';

export interface ReconstructionDocumentPage {
  readonly id: string;
  readonly sequence: number;
  readonly locator: string;
  readonly description: string;
  readonly rightsState: DocumentRightsState;
  readonly providerUrl: string;
}

export interface ReconstructionDocument {
  readonly id: string;
  readonly referenceId: number;
  readonly title: string;
  readonly pages: readonly ReconstructionDocumentPage[];
}

export interface GenealogyReconstruction {
  readonly id: ReconstructionId;
  readonly title: string;
  readonly shortTitle: string;
  readonly summary: string;
  readonly boundary: string;
  readonly nodes: readonly ReconstructionNode[];
  readonly edges: readonly ReconstructionEdge[];
  readonly timeline: readonly ReconstructionTimelineEvent[];
  readonly documents: readonly ReconstructionDocument[];
  readonly publication: PublicationReview;
}

export type IdentitySubjectId =
  | 'thomas-senior'
  | 'hempfield-thomas'
  | 'kentucky-thomas';

export interface IdentitySubject {
  readonly id: IdentitySubjectId;
  readonly name: string;
  readonly period: string;
  readonly place: string;
  readonly summary: string;
  readonly recordBoundary: string;
  readonly referenceIds: readonly number[];
}

export interface IdentityConnection {
  readonly id: string;
  readonly subjectIds: readonly IdentitySubjectId[];
  readonly endpointLabels: readonly string[];
  readonly assessment: 'possible' | 'excluded';
  readonly label: string;
  readonly statement: string;
  readonly limitation: string;
  readonly referenceIds: readonly number[];
}

export interface IdentityTimelineEvent {
  readonly id: string;
  readonly date: string;
  readonly title: string;
  readonly detail: string;
  readonly referenceIds: readonly number[];
}

export interface GenealogyIdentityModel {
  readonly id: 'three-thomases';
  readonly title: string;
  readonly shortTitle: string;
  readonly summary: string;
  readonly boundary: string;
  readonly subjects: readonly IdentitySubject[];
  readonly connections: readonly IdentityConnection[];
  readonly timeline: readonly IdentityTimelineEvent[];
  readonly annBoundary: string;
  readonly referenceIds: readonly number[];
  readonly publication: PublicationReview;
}

export interface MediaProvenance {
  readonly sourcePage?: string;
  readonly rightsSourcePage?: string;
  readonly creator?: string;
  readonly collection: string;
  readonly rightsStatement: string;
  readonly credit: string;
}

export interface PublicMedia {
  readonly id: MediaId;
  readonly kind: 'portrait' | 'place' | 'document' | 'map' | 'marker';
  readonly role: 'evidence' | 'context';
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly label: string;
  readonly title: string;
  readonly caption: string;
  readonly limitation?: string;
  readonly fit?: 'cover' | 'contain';
  readonly objectPosition?: string;
  readonly referenceIds: readonly number[];
  readonly provenance: MediaProvenance;
  readonly publication: PublicationReview;
}

export interface PublicImageNeed {
  readonly id: string;
  readonly priority: 'normal' | 'high';
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

export interface PublicGenealogyContent {
  readonly people: readonly Person[];
  readonly relationships: readonly Relationship[];
  readonly references: readonly Reference[];
  readonly researchCases: readonly ResearchCase[];
  readonly stories: readonly Story[];
  readonly clusters: readonly EvidenceCluster[];
  readonly reconstructions: readonly GenealogyReconstruction[];
  readonly identityModels: readonly GenealogyIdentityModel[];
  readonly media: Readonly<Record<MediaId, PublicMedia>>;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}
