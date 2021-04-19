import React from 'react';
import PropTypes from 'prop-types';
import {  Progress, Image, Icon, Label } from 'semantic-ui-react';

import { formatBytes, formatDuration } from './utils';
class Preview extends React.PureComponent {
	render() {
		const {
			className,
			style,
			fileWithMeta: { cancel, remove, restart },
			meta: { name = '', percent = 0, size = 0, previewUrl, status, duration, validationError },
			isUpload,
			canCancel,
			canRemove,
			canRestart,
			extra: { minSizeBytes }
		} = this.props;

		let title = `${name || '?'}, ${formatBytes(size)}`;
		if (duration) title = `${title}, ${formatDuration(duration)}`;

		if (status === 'error_file_size' || status === 'error_validation') {
			return (
				<div className={className} style={style}>
					<span className="dzu-previewFileNameError">{title}</span>
					{status === 'error_file_size' && (
						<span>{size < minSizeBytes ? 'File too small' : 'File too big'}</span>
					)}
					{status === 'error_validation' && <span>{String(validationError)}</span>}
					{canRemove && (
						<React.Fragment>
							<Icon name="trash" fitted onClick={remove} />
						</React.Fragment>
					)}
				</div>
			);
		}

		if (status === 'error_upload_params' || status === 'exception_upload' || status === 'error_upload') {
			title = `${title} (upload failed)`;
		}
		if (status === 'aborted') title = `${title} (cancelled)`;

		return (
			<React.Fragment>
				{/* <Grid.Column> */}
					{/* // className={className}
					// style={style}
					> */}
					{previewUrl && (
						<React.Fragment>
                            {/* <Card> */}
                             {isUpload && (
									<Progress
										className="uploadProgress"
										autoSuccess
										attached="top"
										size="tiny"
										indicating
										total={100}
										value={status === 'done' || status === 'headers_received' ? 100 : percent}
									/>
								)}
								<Image
									className="square"
									src={previewUrl}
									alt={title}
									title={title}
									verticalAlign="middle"
									centered
									fluid
								/>
								<Label attached="bottom right">
									{status === 'uploading' &&
									canCancel && (
										<React.Fragment>
											<Icon loading name="spinner" fitted />
											<Icon name="x" onClick={cancel} />
										</React.Fragment>
									)}
									{status !== 'preparing' &&
									status !== 'getting_upload_params' &&
									status !== 'uploading' &&
									canRemove && (
										<React.Fragment>
											<Icon name="trash" fitted onClick={remove} />
										</React.Fragment>
									)}
									{[
										'error_upload_params',
										'exception_upload',
										'error_upload',
										'aborted',
										'ready'
									].includes(status) &&
									canRestart && (
										<Icon name="refresh" className="dzu-previewButton" onClick={restart} />
									)}
								</Label>
								{/* {isUpload && (
									<Progress
										className="uploadProgress"
										autoSuccess
										attached="bottom"
										size="tiny"
										indicating
										total={100}
										value={status === 'done' || status === 'headers_received' ? 100 : percent}
									/>
								)} */}
							{/* </Card> */}
						</React.Fragment>
					)}
				{/* </Grid.Column> */}
			</React.Fragment>
		);
	}
}

Preview.propTypes = {
	className: PropTypes.string,
	imageClassName: PropTypes.string,
	style: PropTypes.object,
	imageStyle: PropTypes.object,
	fileWithMeta: PropTypes.shape({
		file: PropTypes.any.isRequired,
		meta: PropTypes.object.isRequired,
		cancel: PropTypes.func.isRequired,
		restart: PropTypes.func.isRequired,
		remove: PropTypes.func.isRequired,
		xhr: PropTypes.any
	}).isRequired,
	// copy of fileWithMeta.meta, won't be mutated
	meta: PropTypes.shape({
		status: PropTypes.oneOf([
			'preparing',
			'error_file_size',
			'error_validation',
			'ready',
			'getting_upload_params',
			'error_upload_params',
			'uploading',
			'exception_upload',
			'aborted',
			'error_upload',
			'headers_received',
			'done'
		]).isRequired,
		type: PropTypes.string.isRequired,
		name: PropTypes.string,
		uploadedDate: PropTypes.string.isRequired,
		percent: PropTypes.number,
		size: PropTypes.number,
		lastModifiedDate: PropTypes.string,
		previewUrl: PropTypes.string,
		duration: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
		videoWidth: PropTypes.number,
		videoHeight: PropTypes.number,
		validationError: PropTypes.any
	}).isRequired,
	isUpload: PropTypes.bool.isRequired,
	canCancel: PropTypes.bool.isRequired,
	canRemove: PropTypes.bool.isRequired,
	canRestart: PropTypes.bool.isRequired,
	files: PropTypes.arrayOf(PropTypes.any).isRequired, // eslint-disable-line react/no-unused-prop-types
	extra: PropTypes.shape({
		active: PropTypes.bool.isRequired,
		reject: PropTypes.bool.isRequired,
		dragged: PropTypes.arrayOf(PropTypes.any).isRequired,
		accept: PropTypes.string.isRequired,
		multiple: PropTypes.bool.isRequired,
		minSizeBytes: PropTypes.number.isRequired,
		maxSizeBytes: PropTypes.number.isRequired,
		maxFiles: PropTypes.number.isRequired
	}).isRequired
};

export default Preview;
