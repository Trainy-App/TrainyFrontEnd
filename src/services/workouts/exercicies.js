import api from "@/plugins/axios";

class ExerciciesService {
    async getExercicies() {
        try {
        const response = await api.get("trainy/exercicies/");
        return response.data;
        } catch (error) {
        return error.response.data;
        }
    }

}

export default new ExerciciesService();
