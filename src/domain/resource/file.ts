import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
  Guard,
  ValueObject,
} from '@appvise/domain';
import { MimeType } from '../../domain';

export interface FileProps {
  bucket: string;
  name: string;
  mimeType: MimeType;
  size: number;
  url?: string;
  public: boolean;
}

export class File extends ValueObject<FileProps> {
  get bucket(): string {
    return this.props.bucket;
  }

  get name(): string {
    return this.props.name;
  }

  get mimeType(): MimeType {
    return this.props.mimeType;
  }

  get size(): number {
    return this.props.size;
  }

  get url(): string | undefined {
    return this.props.url;
  }

  get public(): boolean {
    return this.props.public;
  }

  protected validate(props: FileProps): void {
    const mimeTypeKeys = Object.keys(MimeType);

    if (!Guard.lengthIsBetween(props.name, 1, 255)) {
      throw new ArgumentOutOfRangeException('name is out of range');
    }

    if (!mimeTypeKeys.includes(props.mimeType)) {
      throw new ArgumentInvalidException('mimeType is not a valid MimeType');
    }
  }
}
