export abstract class ResponseFormatter {
	static formate<Model>(success: boolean, message: string, result: Model[] = [], totalCount: number = 1, skip: number = 0, take: number = 0) {
		return {
			success: success,
			message: message,
			totalItems: totalCount,
			itemsPerPage: result.length,
			totalPages: Math.ceil(totalCount / (result.length || 1)),
			page: Math.floor(skip / take) + 1 || 1,
			data: result
		};
	};
};