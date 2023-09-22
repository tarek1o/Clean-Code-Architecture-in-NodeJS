export abstract class ResponseFormatter {
    static formate<Model>(success: boolean, message: string, result: Model[] = [], pageNo: number = 1, totalPages: number = 1) {
        return {
            success: success,
            message: message,
            pageNo: pageNo,
            itemsNoPerPages: result.length,
            totalPages: totalPages,
            data: result
        }
    }
}