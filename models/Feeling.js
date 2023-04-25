import mongoose from 'mongoose';

const feelingSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		user: {
			type: String,
			required: true,
        },
        with: {
            type: mongoose.Schema.Types.Mixed,
        },
        place: {
            type: String
        },
        hoursOfSleep: {
            type: Number
        },
        additional: {
            type: String
        }
	},
	{ timestamps: true }
);

export const Feeling = mongoose.model('Feeling', feelingSchema);
