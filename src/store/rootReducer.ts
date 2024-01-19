import { combineReducers } from "@reduxjs/toolkit";
import entityReducer from "./reducers/entityReducer";
import internalUserReducer from "./reducers/internalUserReducer";
import externalUserReducer from "./reducers/externalUserReducer";
import DetailScreenReducer from "./reducers/DetailScreenReducer";
import cousellorDetailReducer from "./reducers/counsellorDetailsReducer";
import cousellorOverviewReducer from "./reducers/counsellorOverViewReducer";
import counsellorAvailabilityReducer from "./reducers/counsellorAvailabilityReducer";
import getMetaReducer from "./reducers/getMetaReducer";
import saveMetaReducer from "./reducers/saveMetaReducer"
import counsellorExceptionReducer from "./reducers/counsellorExceptionReducer";
import counsellorListReducer from "./reducers/counsellorListReducer";
import DetailReducer from "./reducers/DetailReducer";
import counsellorStatusDataReducer from "./reducers/counsellorStatusDataReducer";
import SelectedCounsellorListReducer from "./reducers/SelectedCounsellorListReducer";
import learnersListReducer from "./reducers/learnersListReducer";
import sessionListReducer from "./reducers/sessionListReducer";
import learnerSessionsListReducer from "./reducers/learnerSessionListReducer";
import CounsellorsStatsReducer from "./reducers/counsellorsStatsReducer";
import CounsellorStatsReducer from "./reducers/counsellorStatsReducer";
import CancelSessionReducer from "./reducers/CancelSessionReducer";
import ChangeCounsellorReducer from "./reducers/ChangeCounsellorReducer";
import FeedbackListingReducer from "./reducers/FeedbackListingReducer";
import FeedbackDetailReducer from './reducers/FeedbackDetailReducer';
import dashboardSessionReducer from "./reducers/dashboardSessionReducer";
import dashboardStatusDataReducer from "./reducers/dashboardStatusDataReducer";
import learnersDetailsReducer from "./reducers/learnerDetailsReducer";
import ActionPlanReducer from "./reducers/ActionPlanReducer";
import GetChangeCounsellorListReducer from "./reducers/GetChangeCounsellorListReducer";
import counsellorOccupancyReducer from "./reducers/counsellorOccupancyReducer";
import PayrollListReducer from "./reducers/PayrollListReducer";
import UserFeedbackListReducer from "./reducers/UserFeedbackListReducer";
import sessionLogsReducer from "./reducers/sessionLogsReducer";
import ReaseonListReducer from "./reducers/ReasonListReducer";
import InterviewerListingReducer from "./reducers/InterviewerListingReducer";
import mockInterviewReducer from "./reducers/MockInterviewReducer";
import InterviewerReducer from "./reducers/InterviewerReducer";
import DocumentListingReducer from "./reducers/DocumentListingReducer";
import InterviewTitleReducer from "./reducers/InterviewTitleReducer";
import GetPlansReducer from "./reducers/GetPlansReducer";
import TestResultReducer from "./reducers/TestResultReducer";
import ScoreTraceReducers from "./reducers/ScoreTraceReducer";
import mockSessionReducer from "./reducers/MockSessionReducer";
import entityActivePlanReducer from "./reducers/entityActivePlanReducer";
import ActiveEntitiesReducer from "./reducers/ActiveEntitiesReducer";
import entityAssignPackageReducer from "./reducers/entityAssignPackageReducer";
import entityAssignedPackageReducer from "./reducers/entityAssignedPackageReducer"
import sessionListingReducer from "./reducers/sessionListingReducer";
import entityUserDetailsReducer from "./reducers/GetStudentListReducer";
import entityAssignedUserDetailsReducer from "./reducers/studentListingReducer";
import entityItemDetailReducer from "./reducers/entityItemDetailReducer";
import GlobalTaxListReducer from "./reducers/GlobalTaxListReducer";
import EntityMasterPlanReducer from "./reducers/EntityMasterPlanReducer";
import EntityItemMasterReducer from "./reducers/EntityItemMasterReducer";
import globalItemReducer from "./reducers/GlobalItemReducer";
import getAllEntityReducer from "./reducers/GetAllEntityReducer";
import EntityMapItemReducer from "./reducers/entityMapItemReducer";
import changeEntityPackageReducer from "./reducers/ChangeEntityPackageReducer";
import ViewCommercialPricingReducer from "./reducers/ViewCommercialPricingReducer";
import sessionSlotsOverrideListingReducer from "./reducers/SessionSlotsOverrideReducer";
import viewFeedbackReducer from "./reducers/viewFeedbackReducer";
import ActiveUsersReducer from "./reducers/ActiveUsersReducer";
import scheduledSessionListingReducer from "./reducers/ScheduledSessionListingReducer";
import InActiveUsersReducer from "./reducers/InActiveUsersReducer";
import ChangeSessionOverrideReducer from "./reducers/ChangeSessionOverrideReducer";
import CounsellorCountsReducer from "./reducers/CounsellorCountReducer";
import PastCounsellorCountsReducer from "./reducers/PastCounsellorCountReducer";
import getGlobalAvailabilityReducer from "./reducers/GetGlobalAvailabilityReducer";
import sessionsListReducer from "./reducers/sessionsListReducer";
import CounsellorPayrollGrpReducer from "./reducers/counsellorPayrollGrpReducer";
import CounsellorRatingReducer from "./reducers/counsellorRatingReducer";
import CounsellorSessionGrpReducer from "./reducers/counsellorSessionGrpReducer";
import EntityPackageReducer from "./reducers/entityPackageReducer";
import AssignedEntityPackageReducer from "./reducers/AssignedEntityPackageReducer";
import sessionsDetailAction from "./actions/sessionsDetailAction";
import sessionsDetailReducer from "./reducers/sessionsDetailReducer";
import interviewerLanguagesReducer from "./reducers/interviewerLanguagesReducer"
import entityMappedItemReducer from "./reducers/entitiesMappedItemReducer";
import LearningHubOrderReducer from "./reducers/LearningHubOrderReducer";
import AllActionPlansReducer from "./reducers/AllActionPlansReducer";
import OrderDetailReducer from "./reducers/OrderDetailsReducer";
import getAllowedRoutesReducer from "./reducers/getAllowedRoutesReducer";
import InternalUserRoleReducer from "./reducers/InternalUserRoleReducer";
import RemoveInterviewerReducer from "./reducers/RemoveInterviewerReducer";
import counsellorPerformanceReducer from "./reducers/counsellorPerformanceReducer";
import counselorCareerSuccessionPlanReducer from "./reducers/CounselorCareerSuccessionPlanReducer";
import getAllPossibleRoutesReducer from "./reducers/getAllPossibleRoutesReducer";
import getParticularRoutesReducer from "./reducers/getParticularRoutesReducer";
import CSMPReducer from "./reducers/CSMPReducer";
import counsellorLearnersDetailReducer from "./reducers/CounsellorLearnersDetailReducer";
import GetPersonifyCspReducer from "./reducers/GetPersonifyCspReducer";
import cousellorOverviewDataReducer from "./reducers/CounsellorOverviewDataReducer";
import getLogisticListReducer from "./reducers/GetLogisticListReducer";
import { getCollegeMasterReducer, postCollegeMasterReducer } from './reducers/CollegeMasterReducer';
import RankReducer from "./reducers/RankReducer";
import { DisciplineListReducer, DisciplineReducer } from "./reducers/DisciplineReducer";
import { AcademicReducer, ProgramLevelListReducer, ProgramListReducer } from "./reducers/AcademicReducer";
import { IntakeListReducer, ProgramReducer } from "./reducers/ProgramReducer";
import AffilitionMasterReducer from "./reducers/AffilitionMasterReducer";
import GetRegionListReducer from "./reducers/GetRegionListReducer";
import GetCityListReducer from "./reducers/GetCityListReducer";
import GetVpaListReducer from "./reducers/GetVpaListReducer";
import GetOfferListReducer from "./reducers/GetOfferListReducer";
import AccreditationReducer from "./reducers/AccreditationReducer";
import EntityCampusReducer from "./reducers/EntityCampusReducer";
import { RankingListReducer, RankingMapperReducer } from "./reducers/RankingMapperReducer";
import { OccupationReducer, OccupationListReducer } from "./reducers/MasterOccupationReducer";
import { CollegeEventReducer, getCollegeEventListReducer } from "./reducers/CollegeEventReducer";
import { ExamTypeReducer, getExamTypeListReducer } from "./reducers/ExamTypeReducer";
import GetGlobalCouponReducer from "./reducers/GetGlobalCouponReducer";
import inventoryReducer from "./reducers/inventoryReducer";
import { AddMoreReducer } from "./reducers/AddMoreReducer";
import GetHomeSellerDashboardReducer from "./reducers/GetHomeSellerDashboardReducer";
import GetStateListReducer from "./reducers/GetStateListReducer";
import transactionDetailsReducer from "./reducers/transactionDetailsReducer";
import salesTransactionReducer from "./reducers/GetSalesTransactionReducer";
import DepositSlipReducer from "./reducers/DepositSlipReducer";
import GetSellerDataReducer from "./reducers/GetSellerDataReducer";
import GetSellerMetaDataReducer from "./reducers/GetSellerMetaDataReducer";
import GetUniqueSellerMetaDataReducer from "./reducers/GetUniqueSellerMetaDataReducer";
import userVpaDetailsReducer from "./reducers/userVpaDetailsReducer";
import GetCardAllocationListReducer from "./reducers/GetCardAllocationListReducer";
import GetCardLotReducer from "./reducers/GetCardLotReducer";
import GetMasterTransactionReducer from "./reducers/GetMasterTransactionReducer";
import GetUniqueMasterTransactionReducer from "./reducers/GetUniqueMasterTransactionReducer";
// import MasterEntityReducer from "./reducers/MasterEntityReducer";
import EntitySubTypeReducer from "./reducers/EntitySubTypeReducer";
import { getAccomodationReducer, postAccomodationReducer } from "./reducers/AccomodationReducer";
import { getCourseFaqReducer, getCourseListReducer } from "./reducers/CourseFaqReducer";
import { getCourseAssetReducer } from "./reducers/CourseAssetReducer";
import { getContentTypeListReducer, getContentTypeReducer } from "./reducers/ContentTypeReducer";
import { getCatagoryReducer } from "./reducers/CatagoryReducer";
import { getCourseSectionListReducer, getCourseSectionReducer } from "./reducers/CourseSectionReducer";
import { getCourseDetailsReducer, getTopicListReducer } from "./reducers/CourseDetailsReducer";
import { CollegeEntityListReducer, MasterEntityListReducer } from "./reducers/MasterEntityReducer";
import { getSectionContentReducer } from "./reducers/SectionContentReducer";
import DegreeReducer from "./reducers/MasterDegreeReducer";
import { CourseModeListReducer, EntityCoursesReducer } from "./reducers/EntityCoursesReducer";
import { EntityMasterCoursesReducer, EntityTypeListReducer } from "./reducers/EntityMasterCoursesReducer";
import { EventTypeReducer, EventTypeListReducer } from "./reducers/MasterEventTypeReducer";
import { CityReducer, StateIdReducer } from "./reducers/MasterCityReducer";
import { getAccrediationMasterListReducer, getAccrediationMasterReducer } from "./reducers/AccrediationMasterReducer";
import { getAffiliationMasterReducer } from "./reducers/AffiliationMasterReducer";
import { getSubjectMasterReducer, getSubjectMasterListReducer } from "./reducers/SubjectMasterReducer";
import { getTaskstmlMasterReducer } from "./reducers/TaskstmtMasterReducer";
import { getEmploymentStatusListReducer, getEmploymentStatusMasterReducer } from "./reducers/EmploymentStatusMasterReducer";
import { getCourseEligibilityMasterReducer } from "./reducers/CourseEligibilityItyMasterReducer";
import { getCourseExaminationReducer, getExaminationListReducer } from "./reducers/CourseExaminationReducer";
import RMOEmploymentReducer from "./reducers/RMOEmploymentStatusReducer";
import OccupationExamReducer from "./reducers/OccupationExamReducer";
import OccupationExpensesReducer from "./reducers/OccupationExpensesReducer";
import { getStreamMasterListReducer, getStreamMasterReducer } from "./reducers/StreamMasterReducer";
import { getCareerCourseLevelListReducer, getCareerCourseLevelReducer } from "./reducers/CareerCourseLevelReducer";
import { getCourseTypeListReducer, getCourseTypeReducer } from "./reducers/CourseTypeReducer";
import { getCourseMasterListReducer, getCourseMasterReducer } from "./reducers/CourseMasterReducer";
import { AccomodationTypeReducer, AccomodationTypeListReducer } from "./reducers/AccomodationTypeReducer";
import { getCollegeEventDatesReducer } from "./reducers/CollegeEventDatesReducer";
import OccupationCourseReducer from "./reducers/RMOccupationCourseReducer";
import RMOBenchmarkhourReducer from "./reducers/RMOBenchmarkhourReducer";
import { RMOPRegCodeReducer, RMOProgressionReducer } from "./reducers/RMOProgressionReducer";
import ROccupationMetaReducer from "./reducers/ROccupationMetaReducer";
import { getStudyRoutePathReducer } from "./reducers/RMOStudyRoutePathReducer";
import { getOccupationQualificationReducer } from "./reducers/OccupationQualificationReducer";
import { getRMOccupationReducer, getRMOccupationListReducer } from "./reducers/RMOccupationReducer";
import { getStudyRouteReducer } from "./reducers/RMOStudyRouteReducer";
import { getMasterExaminationReducer } from "./reducers/MasterExaminationReducer";
import OccupationSalaryReducer from "./reducers/OccupationSalaryReducer";
import { getPublisherDetailsReducer } from "./reducers/PublisherDetailsReducer";
import { getIntrestPathwayListReducer, getLanguageListReducer, getPublisherListReducer, getSkillListReducer } from "./reducers/Language";
import GetPlatformOfferingReducer from "./reducers/GetPlatformOfferingReducer";
import GlobalMasterCountryReducer from "./reducers/GlobalMasterCountryReducer";
import { MasterStateReducer, CountryIdReducer } from "./reducers/MasterStateReducer";
import { BannerSectionReducer } from "./reducers/BannerSectionReducer";
import { getServicesReducer } from "./reducers/ServicesReducer";
import { BlogsVideosReducer } from "./reducers/BlogsVideosReducer";
import { TestimonialReducer } from "./reducers/TestimonialReducer";
import getRBACAllowedApisReducer from "./reducers/getAllowedApisReducer";
import getAllPossibleApisReducer from "./reducers/getAllPossibleApisReducer";
import getAllowedRoleApisByRoleIdReducer from "./reducers/getAllowedRoleApisByRoleIdReducer";
import { getApiMasterReducer } from "./reducers/ApiMasterReducer";

const rootReducer = combineReducers({
  getApiMaster: getApiMasterReducer,
  getBannerSectionReducer: BannerSectionReducer,
  getBlogsVideosReducer: BlogsVideosReducer,
  getTestimonialReducer: TestimonialReducer,
  getEntitySubType: EntitySubTypeReducer,
  MasterState: MasterStateReducer,
  CountryID: CountryIdReducer,
  getMasterEntityList: MasterEntityListReducer,
  getMasterCollegeList: CollegeEntityListReducer,
  getAccrediationMasterList: getAccrediationMasterListReducer,
  getAffilition: AffilitionMasterReducer,
  getCollege: getCollegeMasterReducer,
  postCollege: postCollegeMasterReducer,
  getAccomodation: getAccomodationReducer,
  postAccomodation: postAccomodationReducer,
  getAccomodationType: AccomodationTypeReducer,
  AccomodationTypeList: AccomodationTypeListReducer,
  getCourseFaq: getCourseFaqReducer,
  getCourseList: getCourseListReducer,
  getCourseAsset: getCourseAssetReducer,
  getContentType: getContentTypeReducer,
  getContentTypeList: getContentTypeListReducer,
  getCatagory: getCatagoryReducer,
  getCourseSection: getCourseSectionReducer,
  getStudyRoutePathData: getStudyRoutePathReducer,
  getStudyRouteData: getStudyRouteReducer,
  getCourseSectionList: getCourseSectionListReducer,
  getCourseDetails: getCourseDetailsReducer,
  getSectionContent: getSectionContentReducer,
  getAccrediationMaster: getAccrediationMasterReducer,
  getAffiliationMaster: getAffiliationMasterReducer,
  getSubjectMaster: getSubjectMasterReducer,
  getSubjectMasterList: getSubjectMasterListReducer,
  getTaskstmlMaster: getTaskstmlMasterReducer,
  getEmploymentStatusMaster: getEmploymentStatusMasterReducer,
  getEmploymentStatusList: getEmploymentStatusListReducer,
  getCourseEligibilityMaster: getCourseEligibilityMasterReducer,
  getCourseExamination: getCourseExaminationReducer,
  getMasterExamination: getMasterExaminationReducer,
  getStreamMaster: getStreamMasterReducer,
  getStreamMasterList: getStreamMasterListReducer,
  getExaminationList: getExaminationListReducer,
  getCareerCourseLevel: getCareerCourseLevelReducer,
  getCareerCourseLevelList: getCareerCourseLevelListReducer,
  getCourseType: getCourseTypeReducer,
  getCourseTypeList: getCourseTypeListReducer,
  getLanguageList: getLanguageListReducer,
  getSkillList: getSkillListReducer,
  getIntrestPathwayList: getIntrestPathwayListReducer,
  getPublisherList: getPublisherListReducer,
  getTopicList: getTopicListReducer,
  getCourseMasterList: getCourseMasterListReducer,
  getCourseMaster: getCourseMasterReducer,
  getRank: RankReducer,
  getDiscipline: DisciplineReducer,
  getDisciplineList: DisciplineListReducer,
  getAcademic: AcademicReducer,
  getProgramLevelList: ProgramLevelListReducer,
  getProgramIdList: ProgramListReducer,
  getAccreditation: AccreditationReducer,
  getMasterCountry: GlobalMasterCountryReducer,
  getEntityCampus: EntityCampusReducer,
  getRankingMapper: RankingMapperReducer,
  getRankingList: RankingListReducer,
  getCollegeEvent: CollegeEventReducer,
  getCollegeEventList: getCollegeEventListReducer,
  getCollegeEventDates: getCollegeEventDatesReducer,
  getExamType: ExamTypeReducer,
  getExamTypeList: getExamTypeListReducer,
  getOccupation: OccupationReducer,
  getOccupationMasterList: OccupationListReducer,
  getDegree: DegreeReducer,
  getEventType: EventTypeReducer,
  getEventTypeList: EventTypeListReducer,
  getCity: CityReducer,
  getStateIdList: StateIdReducer,
  getRMOEmployment: RMOEmploymentReducer,
  getOccupationExam: OccupationExamReducer,
  getOccupationExpenses: OccupationExpensesReducer,
  getOccupationCourse: OccupationCourseReducer,
  getOccupationSalary: OccupationSalaryReducer,
  getRMOccupation: getRMOccupationReducer,
  getRMOccupationList: getRMOccupationListReducer,
  getOccupationQualification: getOccupationQualificationReducer,
  getRMOProgression: RMOProgressionReducer,
  getRegCodeList: RMOPRegCodeReducer,
  getROccupationMeta: ROccupationMetaReducer,
  getAccomodationTypes: AccomodationTypeReducer,
  getRMOBenchmarkhour: RMOBenchmarkhourReducer,
  getCourses: EntityCoursesReducer,
  getCourseModeList: CourseModeListReducer,
  getMasterCourses: EntityMasterCoursesReducer,
  getEntityTypeList: EntityTypeListReducer,
  getProgram: ProgramReducer,
  getIntakeListId: IntakeListReducer,
  entity: entityReducer,
  internalUser: internalUserReducer,
  externalUser: externalUserReducer,
  GetCounsellorData: DetailScreenReducer,
  counsellorDetails: cousellorDetailReducer,
  counsellorOverview: cousellorOverviewReducer,
  counsellorAvailability: counsellorAvailabilityReducer,
  getMeta: getMetaReducer,
  saveMetaResponse: saveMetaReducer,
  counsellorException: counsellorExceptionReducer,
  counsellorList: counsellorListReducer,
  detailReducer: DetailReducer,
  counsellorStatusData: counsellorStatusDataReducer,
  SelectedCounsellorList: SelectedCounsellorListReducer,
  learnerList: learnersListReducer,
  sessionsList: sessionListReducer,
  learnerSessionsList: learnerSessionsListReducer,
  CounsellorsStats: CounsellorsStatsReducer,
  CounsellorStats: CounsellorStatsReducer,
  CancelSession: CancelSessionReducer,
  ChangeCounsellor: ChangeCounsellorReducer,
  feedbackList: FeedbackListingReducer,
  feedbackDetail: FeedbackDetailReducer,
  dashboardSessionList: dashboardSessionReducer,
  dashboardStatusData: dashboardStatusDataReducer,
  dashboardLearnerDetails: learnersDetailsReducer,
  actionPlan: ActionPlanReducer,
  changeCounsellorList: GetChangeCounsellorListReducer,
  counsellorOccupancyList: counsellorOccupancyReducer,
  payrollList: PayrollListReducer,
  userFeedbackList: UserFeedbackListReducer,
  sessionLogs: sessionLogsReducer,
  ReasonList: ReaseonListReducer,
  interviewerOptions: InterviewerListingReducer,
  mockInterview: mockInterviewReducer,
  interviewerList: InterviewerReducer,
  docList: DocumentListingReducer,
  interviewTitle: InterviewTitleReducer,
  getPlans: GetPlansReducer,
  testResults: TestResultReducer,
  trainingScore: ScoreTraceReducers,
  mockSession: mockSessionReducer,
  entityActivePlan: entityActivePlanReducer,
  activeEntityReducer: ActiveEntitiesReducer,
  entityAssignPackage: entityAssignPackageReducer,
  entityAssignedPackage: entityAssignedPackageReducer,
  sessionListing: sessionListingReducer,
  entityUserDetails: entityUserDetailsReducer,
  entityAssignedUserDetails: entityAssignedUserDetailsReducer,
  entityItemDetail: entityItemDetailReducer,
  GlobalTaxList: GlobalTaxListReducer,
  EntityMasterPlan: EntityMasterPlanReducer,
  EntityItemMaster: EntityItemMasterReducer,
  globalItem: globalItemReducer,
  getAllEntity: getAllEntityReducer,
  EntityMapItem: EntityMapItemReducer,
  changeEntityPackage: changeEntityPackageReducer,
  commercialPricing: ViewCommercialPricingReducer,
  sessionSlotsOverride: sessionSlotsOverrideListingReducer,
  viewFeedback: viewFeedbackReducer,
  ActiveUsers: ActiveUsersReducer,
  scheduledSessionListing: scheduledSessionListingReducer,
  InActiveUsers: InActiveUsersReducer,
  ChangeSessionOverride: ChangeSessionOverrideReducer,
  CounsellorCounts: CounsellorCountsReducer,
  PastCounsellorCounts: PastCounsellorCountsReducer,
  getGlobalAvailability: getGlobalAvailabilityReducer,
  sessionsListResult: sessionsListReducer,
  CounsellorPayrollGrp: CounsellorPayrollGrpReducer,
  CounsellorRating: CounsellorRatingReducer,
  CounsellorSessionGrp: CounsellorSessionGrpReducer,
  EntityPackage: EntityPackageReducer,
  AssignedEntityPackage: AssignedEntityPackageReducer,
  sessionsDataResult: sessionsDetailReducer,
  activeLanguages: interviewerLanguagesReducer,
  entityMappedItem: entityMappedItemReducer,
  learningHubOrder: LearningHubOrderReducer,
  learnerActionPlans: AllActionPlansReducer,
  learningHubOrderDetail: OrderDetailReducer,
  allowedRoutesRes: getAllowedRoutesReducer,
  allowedApisRes: getRBACAllowedApisReducer,
  allowedApisByRoleRes: getAllowedRoleApisByRoleIdReducer,
  internalUserRole: InternalUserRoleReducer,
  RemoveInterviewer: RemoveInterviewerReducer,
  CounsellorPerformance: counsellorPerformanceReducer,
  counselorCareerSuccessionPlan: counselorCareerSuccessionPlanReducer,
  allPossibleRoutes: getAllPossibleRoutesReducer,
  allPossibleApis: getAllPossibleApisReducer,
  getParticularRoutes: getParticularRoutesReducer,
  careerSuccessMembership: CSMPReducer,
  counsellorLearnersDetail: counsellorLearnersDetailReducer,
  GetPersonifyCsp: GetPersonifyCspReducer,
  cousellorOverviewData: cousellorOverviewDataReducer,
  getLogisticList: getLogisticListReducer,
  GetRegionList: GetRegionListReducer,
  GetCityList: GetCityListReducer,
  GetVpaList: GetVpaListReducer,
  GetOfferList: GetOfferListReducer,
  addMoreRes: AddMoreReducer,
  GetGlobalCoupon: GetGlobalCouponReducer,
  inventory: inventoryReducer,
  GetHomeSellerDashboard: GetHomeSellerDashboardReducer,
  GetStateList: GetStateListReducer,
  transactionDetails: transactionDetailsReducer,
  salesTransaction: salesTransactionReducer,
  DepositSlip: DepositSlipReducer,
  GetSellerData: GetSellerDataReducer,
  GetSellerMetaData: GetSellerMetaDataReducer,
  GetUniqueSellerMetaData: GetUniqueSellerMetaDataReducer,
  userVpaDetails: userVpaDetailsReducer,
  GetCardAllocationList: GetCardAllocationListReducer,
  GetCardLot: GetCardLotReducer,
  GetMasterTransaction: GetMasterTransactionReducer,
  GetUniqueMasterTransaction: GetUniqueMasterTransactionReducer,
  getPublisherDetails: getPublisherDetailsReducer,
  GetPlatformOffering: GetPlatformOfferingReducer,
  servicesReducer: getServicesReducer,

});

export default rootReducer;
