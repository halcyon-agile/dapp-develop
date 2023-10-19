import request from "../../lib/request";
import { AxiosError } from "axios";
import { ConsultationInvites } from "@/types";

const getConsultationInvites = async (): Promise<
  ConsultationInvites[] | AxiosError | any
> => {
  try {
    const consultations = await request.get("/api/consultation-invites");
    return consultations.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export default getConsultationInvites;
