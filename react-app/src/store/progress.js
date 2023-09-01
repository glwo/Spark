// constants
const SET_PROGRESS = "progress/SET_PROGRESS";
const ADD_PROGRESS = "progress/ADD_PROGRESS";
const UPDATE_PROGRESS = "progress/UPDATE_PROGRESS";
const DELETE_PROGRESS = "progress/DELETE_PROGRESS";

// action creators
const setProgress = (progress) => ({
	type: SET_PROGRESS,
	payload: progress,
});

const addProgress = (progress) => ({
	type: ADD_PROGRESS,
	payload: progress,
});

const updateProgress = (progress) => ({
	type: UPDATE_PROGRESS,
	payload: progress,
});

const deleteProgress = (progressId) => ({
	type: DELETE_PROGRESS,
	payload: progressId,
});

// initial state
const initialState = {
	progressList: [],
};

// async thunk actions
export const fetchProgress = () => async (dispatch) => {
	try {
		// Fetch progress data from the server
		const response = await fetch("/api/progress");
		if (response.ok) {
			const data = await response.json();
			dispatch(setProgress(data));
			return data
		}
		else {
			// throw new Error("Failed to fetch progress data");
		}
	} catch (error) {
		// console.error(error);
	}
};

export const createProgress = (progressData) => async (dispatch) => {
		// Send a POST request to create new progress data
		// console.log("Before dispatching action:", progressData);
		const response = await fetch("/api/progress/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(progressData),
		});
		if (response.ok) {
			const data = await response.json();
			// console.log("After dispatching action (success):", data);
			dispatch(addProgress(data));
			return data
		} else {
			const data = await response.json();
			// console.log("After dispatching action (error):", data);
			if (data.errors) {
			  return data
			}
		  }
};

export const alterProgress = (progressId, progressData) => async (dispatch) => {
	try {
		// Send a PUT request to update the progress data
		const response = await fetch(`/api/progress/${progressId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(progressData),
		});
		if (response.ok) {
			const data = await response.json();
			dispatch(updateProgress(data.progress));
		} else {
			throw new Error("Failed to update progress data");
		}
	} catch (error) {
		console.error(error);
	}
};

export const delProgress = (progressId) => async (dispatch) => {
	try {
		// Send a DELETE request to remove the progress data
		const response = await fetch(`/api/progress/${progressId}`, {
			method: "DELETE",
		});
		if (response.ok) {
			dispatch(deleteProgress(progressId));
		} else {
			throw new Error("Failed to delete progress data");
		}
	} catch (error) {
		console.error(error);
	}
};

// reducer
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROGRESS:
			return { ...state, progressList: action.payload };
			case ADD_PROGRESS:
				// console.log(state)
				// console.log("ADD_PROGRESS action payload:", action.payload);
				return {
				  ...state,
				  progressList: [...state.progressList.progress_entries || [], action.payload],
				};
		case UPDATE_PROGRESS:
			return {
				...state,
				progressList: state.progressList.map((progress) =>
					progress.id === action.payload.id ? action.payload : progress
				),
			};
		case DELETE_PROGRESS:
			return {
				...state,
				progressList: state.progressList.filter((progress) => progress.id !== action.payload),
			};
		default:
			return state;
	}
}
