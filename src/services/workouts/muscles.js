import api from "@/plugins/axios";

class MusclesService {
    async getMuscles() {
        try {
        const response = await api.get("trainy/muscles/");
        return response.data;
        } catch (error) {
        return error.response.data;
        }
    }
}

export default new MusclesService();
